import {matchPath} from 'react-router'

export default async function fetchData(url, routes, store ) {
  const intialActions = routes.reduce((initalRoute, currentRoute) => {
    if (matchPath(url, currentRoute) && currentRoute.preLoadedActions) {
      return currentRoute.preLoadedActions.concat(initalRoute)
    }
    return initalRoute;
  }, []);
  return Promise.all(intialActions.map(action => store.dispatch(action())));
}
