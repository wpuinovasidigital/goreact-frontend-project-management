import network from "@/utils/network";

const boards = {
  async my() {
    return network.get('/api/v1/boards') // admin
  },
};

export default boards;
