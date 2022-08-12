from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [

    path('account-list/', views.AccountList.as_view(), name='account-list'),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('account-create/', views.AccountCreate.as_view(), name='account-create'),
    path('account-detail/<str:pk>/', views.AccountDetail.as_view(), name='account-detail'),

    path('all-post-details/', views.AllPostDetails.as_view(), name='all-post-details'),
    path('post-create/', views.PostCreate.as_view(), name='post-create'),
    path('post-update/<str:pk>/', views.PostUpdate.as_view(), name='post-update'),
    path('post-delete/<str:pk>/', views.PostDelete.as_view(), name='post-delete'),

    path('all-comment-details/<str:pk>/', views.AllCommentDetails.as_view(), name='all-comment-details'),
    path('comment-create/<str:pk>/', views.CommentCreate.as_view(), name='comment-create'),
    


]