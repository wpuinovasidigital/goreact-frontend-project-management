// import network from '@/utils/network';

const boards = {
  async my() {
    // return network.post('/users', payload);
    return {
      data: {
        status: 'success',
        response_code: 200,
        message: 'Data boards berhasil diambil',
        data: [
          {
            internal_id: 0,
            public_id: '4ff6ad6d-4b24-446a-86a6-de0533ef3c20',
            title: 'Project Kursi Pak Fulan',
            description: 'ini adalah project pertama',
            owner_internal_id: 9,
            owner_public_id: '00000000-0000-0000-0000-000000000000',
            created_at: '2025-08-02T16:33:36.462609Z',
          },
          {
            internal_id: 1,
            public_id: 'e9f73c0d-9d5a-41dd-9945-cf45bb786179',
            title: 'Project Kursi Pak Anto',
            description: 'ini adalah project kedua',
            owner_internal_id: 9,
            owner_public_id: '00000000-0000-0000-0000-000000000000',
            created_at: '2025-08-02T16:57:25.993303Z',
          },
        ],
      },
    };
  },
};

export default boards;
