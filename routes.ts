interface routeInterface {
  title: string,
  path: string,
  name: string,
  component?: string
  routes?: routeInterface[]
}

const routes: routeInterface[] = [
  { title: '地图', path: '/map', name: 'map', component: '@/pages/map/map' },
];

export default routes;
