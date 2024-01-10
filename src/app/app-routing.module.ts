import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./main/tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./load/load.module').then( m => m.LoadPageModule)
  // },
  
  {
    path: 'maintabs',
    loadChildren: () => import('./main/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/public/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/public/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/public/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./pages/public/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/public/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'become-an-seller',
    loadChildren: () => import('./pages/public/become-an-seller/become-an-seller.module').then( m => m.BecomeAnSellerPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/public/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/public/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/settings/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'my-collection',
    loadChildren: () => import('./pages/shared/my-collection/my-collection.module').then( m => m.MyCollectionPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./pages/shared/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'user-orders',
    loadChildren: () => import('./pages/buyer/user-orders/user-orders.module').then( m => m.UserOrdersPageModule)
  },
  {
    path: 'buyer-offers',
    loadChildren: () => import('./pages/buyer/buyer-offers/buyer-offers.module').then( m => m.BuyerOffersPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/shared/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'mycart',
    loadChildren: () => import('./pages/payments/mycart/mycart.module').then( m => m.MycartPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/shared/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./modals/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'newly-added',
    loadChildren: () => import('./pages/products/newly-added/newly-added.module').then( m => m.NewlyAddedPageModule)
  },
  {
    path: 'sort',
    loadChildren: () => import('./modals/sort/sort.module').then( m => m.SortPageModule)
  },
  {
    path: 'summary',
    loadChildren: () => import('./pages/payments/summary/summary.module').then( m => m.SummaryPageModule)
  },
  {
    path: 'pay-method',
    loadChildren: () => import('./pages/payments/pay-method/pay-method.module').then( m => m.PayMethodPageModule)
  },
  {
    path: 'delivery',
    loadChildren: () => import('./pages/payments/delivery/delivery.module').then( m => m.DeliveryPageModule)
  },
  {
    path: 'date',
    loadChildren: () => import('./modals/date/date.module').then( m => m.DatePageModule)
  },
  {
    path: 'product-add',
    loadChildren: () => import('./pages/seller//product-add/product-add.module').then( m => m.ProductAddPageModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./pages/seller/offers/offers.module').then( m => m.OffersPageModule)
  },
  {
    path: 'sold-orders',
    loadChildren: () => import('./pages/seller/sold-orders/sold-orders.module').then( m => m.SoldOrdersPageModule)
  },
  {
    path: 'seller-products',
    loadChildren: () => import('./pages/seller/seller-products/seller-products.module').then( m => m.SellerProductsPageModule)
  },
  {
    path: 'sold-orders',
    loadChildren: () => import('./pages/seller/sold-orders/sold-orders.module').then( m => m.SoldOrdersPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/shared/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'revenue',
    loadChildren: () => import('./pages/seller/revenue/revenue.module').then( m => m.RevenuePageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/seller/reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: 'mw-sort',
    loadChildren: () => import('./modals/mw-sort/mw-sort.module').then( m => m.MwSortPageModule)
  },
  {
    path: 'mw-filter',
    loadChildren: () => import('./modals/mw-filter/mw-filter.module').then( m => m.MwFilterPageModule)
  },
  {
    path: 'terms-of-use',
    loadChildren: () => import('./pages/public/terms-of-use/terms-of-use.module').then( m => m.TermsOfUsePageModule)
  },
  {
    path: 'terms-of-sales',
    loadChildren: () => import('./pages/public/terms-of-sales/terms-of-sales.module').then( m => m.TermsOfSalesPageModule)
  },
  {
    path: 'return-policy',
    loadChildren: () => import('./pages/public/return-policy/return-policy.module').then( m => m.ReturnPolicyPageModule)
  },
  {
    path: 'img-upload',
    loadChildren: () => import('./modals/img-upload/img-upload.module').then( m => m.ImgUploadPageModule)
  },
  {
    path: 'product-details',
    loadChildren: () => import('./pages/products/product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'mwstore-details',
    loadChildren: () => import('./pages/products/mwstore-details/mwstore-details.module').then( m => m.MwstoreDetailsPageModule)
  },
  {
    path: 'kc-blog-cat',
    loadChildren: () => import('./pages/products/kc-blog-cat/kc-blog-cat.module').then( m => m.KcBlogCatPageModule)
  },
  {
    path: 'kc-blog-details',
    loadChildren: () => import('./pages/products/kc-blog-details/kc-blog-details.module').then( m => m.KcBlogDetailsPageModule)
  },
  {
    path: 'featured-games',
    loadChildren: () => import('./pages/products/featured-games/featured-games.module').then( m => m.FeaturedGamesPageModule)
  },
  {
    path: 'recent-price-change',
    loadChildren: () => import('./pages/products/recent-price-change/recent-price-change.module').then( m => m.RecentPriceChangePageModule)
  },
  {
    path: 'month-year',
    loadChildren: () => import('./modals/month-year/month-year.module').then( m => m.MonthYearPageModule)
  },
  {
    path: 'country-list',
    loadChildren: () => import('./modals/country-list/country-list.module').then( m => m.CountryListPageModule)
  },
  {
    path: 'state-list',
    loadChildren: () => import('./modals/state-list/state-list.module').then( m => m.StateListPageModule)
  },
  {
    path: 'order-details',
    loadChildren: () => import('./pages/payments/order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  },
  {
    path: 'load',
    loadChildren: () => import('./load/load.module').then( m => m.LoadPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./main/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'search-bar',
    loadChildren: () => import('./pages/shared/search-bar/search-bar.module').then( m => m.SearchBarPageModule)
  },
  {
    path: 'sign-series',
    loadChildren: () => import('./pages/products/sign-series/sign-series.module').then( m => m.SignSeriesPageModule)
  },
  {
    path: 'recently-sold',
    loadChildren: () => import('./pages/products/recently-sold/recently-sold.module').then( m => m.RecentlySoldPageModule)
  },
  {
    path: 'pay-result',
    loadChildren: () => import('./pages/payments/pay-result/pay-result.module').then( m => m.PayResultPageModule)
  },
  {
    path: 'product-update',
    loadChildren: () => import('./pages/seller/product-update/product-update.module').then( m => m.ProductUpdatePageModule)
  },
  {
    path: 'sign-series-details',
    loadChildren: () => import('./pages/products/sign-series-details/sign-series-details.module').then( m => m.SignSeriesDetailsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
