import axios from 'axios';

import storage from '../providers/storage';

function sleep(seconds = 2) {
  return new Promise(ok => {
    setTimeout(ok, Math.random() * seconds * 1000);
  });
}

const service = {
  memory: storage.get('contacts'),

  async create(data = {}) {
    if (!data.id) {
      throw new Error('An `id` must be provided');
    }

    this.memory[data.id] = data;
    storage.set('contacts', this.memory);

    await sleep();

    return this.memory[data.id];
  },

  async delete(id) {
    delete this.memory[id];

    await sleep();

    return null;
  },

  async fetch() {
    const {
      data: { results },
    } = await axios.get('/api', {
      baseURL: 'https://randomuser.me',
      params: { results: 57 },
    });

    this.memory = results.reduce((acc, item) => {
      const id = `${item.id.name}${item.id.value}`
        .replace(/\s/g, '')
        .replace(/undefined/g, '');

      if (id === 'null') {
        return acc;
      }

      return { ...acc, [id]: { ...item, id } };
    }, {});

    storage.set('contacts', this.memory);

    return this.memory;
  },

  async read(id) {
    if (!this.memory) {
      await this.fetch();
    }

    const temporary = Object.values(this.memory).sort((a, b) =>
      a.name.first > b.name.first ? 1 : -1,
    );

    await sleep();

    if (id) {
      return temporary.find(item => id === item.id);
    }

    return temporary;
  },

  async update(id, data) {
    if (this.memory[id]) {
      this.memory[id] = data;
      storage.set('contacts', this.memory);
    }

    await sleep();

    return this.memory[id];
  },
};

export default service;
