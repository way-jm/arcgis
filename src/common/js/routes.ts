const routes = [
  { name: '首页', path: '/', key: 'index',component:'@/pages/index/index',exact:true,showInHeader:false },
  { name: '数据中心', path: '/data-center', key: 'dataCenter',component:'@/pages/index/index',exact:true,showInHeader:true },
  // {
  //   name: '专题图', link: '/theme-map', key: 'themeMap', children: [
  //     { name: '企业监管', link: '/t-company', key: 'tCompany' },
  //     { name: '林地监管', link: '/t-wood', key: 'tWood' },
  //     { name: '水质监管', link: '/t-water', key: 'tWater' },
  //     { name: '大气监管', link: '/t-air', key: 'tAir' },
  //   ],
  // },
  // {
  //   name: '九大行动', link: '/actions', key: 'actions', children: [
  //     { name: '禁新建', link: '/a-banBuild', key: 'aBanBuild' },
  //     { name: '减存量', link: '/a-minusStore', key: 'aMinusStore' },
  //     { name: '关污源', link: '/a-closePollution', key: 'aClosePollution' },
  //     { name: '建新绿', link: '/a-newGreen', key: 'aNewGreen' },
  //   ],
  // },
  // { name: '监督检查', link: '/check', key: 'check' },
  // { name: '资料中心', link: '/source', key: 'source' },
  // { name: '绩效考核', link: '/kpi', key: 'kpi' },
];

export default routes;
