
export default {

  //In case of error in the system.
  SERVER_ERROR: 500,

  //Success OK when only read operations are performed
  SUCCESS_READ_OPERATION: 200,

  //Success OK when any creation or write operation is performed
  SUCCESS_WRITE_OPERATION_: 201,

  //Validation errors
  VALIDATION_ERROR: 400,

  //Authorization failed
  UNAUTHORIZED: 401,

  // Understood the request, but is refusing to fulfill it
  FORBIDDEN: 403,

  //When the requested data to be processed on is not found. Happens when bad reference is provided, ex: invalid ID
  UN_PROCESSABLE_ENTITY: 422,

  //When their is some conflict while processing a request. Ex. Duplicate user
  CONFLICT_ENTITY: 409,

  //When a resource is not found.
  NOT_FOUND: 404,

  // Returned by the Search API when an invalid format is specified in the request.
  NOT_ACCEPTABLE: 406,

  //Returned in API v1.1 when a request cannot be served due to the application’s rate limit having been exhausted for the resource.
  TOO_MANY_REQUEST: 429,

  // Something is broken.
  INTERNAL_SERVER_ERROR: 500,

  // PR is down/under maintainence mode.
  BAD_GATEWAY: 502,

  // PR server are UP but overloaded
  SERVICE_UNAVAILABLE: 503,

  //custom error code
  YOUTUBE_ERROR_CODE : 505
};
