/**
 * Created by 9i on 2016/12/6.
 */
import home from './pages/home.vue'
import notFound from './pages/404.vue'
import henBatchInfo from './pages/hen_batchInfo.vue'
import vaccine from './pages/vaccine.vue'
import supplier from './pages/supplier.vue'
import daily from './pages/dailyInfo.vue'
import mixedFeed from './pages/mixedFeed.vue'
import fullPrice from './pages/fullprice.vue'
import loss from './pages/loss.vue'

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
  component: fullPrice
},
{
  path: '/mixedFeed',
  name: 'mixedFeed',
  component: mixedFeed
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
  path: '/loss',
  name: 'loss',
  component: loss
},
{
  path: '/eggSale',
  name: 'eggSale',
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
  component: daily
},
{
  path: '/chickInfo',
  name: 'chickInfo',
  component: notFound
}
]
