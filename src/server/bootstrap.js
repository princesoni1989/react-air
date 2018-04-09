import logger from "./logger";
import config from "./config";

//add logger to global scope
global.log = logger;


//put configuration on to global scope
global.config = config


exports.apiResponseGenerator = function (req, res, next) {

  /**
   * sends response based on parameters
   * @param {object} dataObj - data to be sent in response
   * @param {object} headers - header object
   * @param {number} status - status of response
   */
  function sendResponse(dataObj, headers, status) {
    if (Boolean(status)) status = parseInt(status, 10);
    else status = 200;
    headers = headers || {};
    res.writeHead(status, headers);
    res.end(JSON.stringify(dataObj));
  }

  /**
   * sends response based on parameters(Error in processing)
   * @param {number} status - status of response
   * @param {string} message - message to be sent in response
   * @param {object} data - data to be sent in response
   * @param {string} code - custom code to be sent in response
   * @param {object} headers - header object
   */
  res.sendError = function (status, data, message, code, headers) {
    var response = {
      status: status,
      message: message
    }
    if (data || code) {
      response.error = {
        code: code,
        data: data
      }
    }
    sendResponse(response, headers, status);
  };

  /**
   * sends response based on parameters(Success in processinh)
   * @param {number} status - status of response
   * @param {string} message - message to be sent in response
   * @param {object} data - data to be sent in response
   * @param {string} code - custom code to be sent in response
   * @param {object} headers - header object
   */
  res.sendSuccess = function (status, data, message, code, headers) {
    var response = {
      status: status,
      message: message
    }
    if (data || code) {
      response.success = {
        code: code,
        data: data
      }
    }
    //log.info('Response %j\nHeader: %j\nStatus: %s', response, headers, status);
    sendResponse(response, headers, status);
  };

  next();
};


