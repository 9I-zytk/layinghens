/**
 * Created by 9i on 2016/12/6.
 */
import home from './pages/home.vue'
import notFound from './pages/404.vue'
import henBatchInfo from './pages/hen_batchInfo.vue'
import vaccine from './pages/vaccine.vue'
import supplier from './pages/supplier.vue'

export default [{
  path: '/',
  name: 'home',
  component: home
},
{
  path: '/404',
  name: '404',
  component: notFound
},
{
  path: '/info',
  name: 'info',
  component: henBatchInfo
},
{
  path: '/supplier',
  name: 'supplier',
  component: supplier
},
{
  path: '/vaccine',
  name: 'vaccine',
  component: vaccine
},
{
  path: '/fullPrice',
  name: 'fullPrice',
  component: notFound
},
{
  path: '/mixedFeed',
  name: 'mixedFeed',
  component: notFound
},
{
  path: '/otherCost',
  name: 'otherCost',
  component: notFound
},
{
  path: '/costTotal',
  name: 'costTotal',
  component: notFound
},
{
  path: '/eggProRate',
  name: 'eggProRate',
  component: notFound
},
{
  path: '/profit',
  name: 'profit',
  component: notFound
},
{
  path: '/dailyInfo',
  name: 'dailyInfo',
  component: notFound
},
{
  path: '/chickInfo',
  name: 'chickInfo',
  component: notFound
}
]
