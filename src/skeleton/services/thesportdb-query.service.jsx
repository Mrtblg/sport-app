import axios from 'axios';

/**
 * Service responsible for requests directed to thesportdb API
 */
const thesportdbQueryService = {

  /**
   * A wrapper on http requests directed to thesportdb API
   * @param {Object} options
   * @param {String} options.url                   The request url on this API
   * @param {String} options.method  @default get  The http method to use
   * @param {Object} options.data                  Data to pass as params for the request
   */
  query: async (options) => {
    const { url, method } = options;
    return axios({
      method: method === undefined ? 'get' : method,
      url: `https://www.thesportsdb.com/api/v1/json/1/${url}`,
      data: options.data,
    }).then(response => response.data);
  },
};

export default thesportdbQueryService;
