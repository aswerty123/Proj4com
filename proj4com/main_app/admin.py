from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account, Relationship, Post, Post_Comment, Post_like
# Register your models here.

class AccountAdmin(UserAdmin):
    list_display = ('id','email','first_name', 'last_name', 'date_joined', 'last_login', 'is_admin', 'is_staff')
    search_fields = ('id','email', 'first_name', 'last_name')
    readonly_fields = ('id', 'date_joined', 'last_login')
    ordering = ('email',)

    filter_horizontal = ()
    list_filter = ()

    fieldsets = (
        (None, {'fields': ('id','email','first_name', 'last_name', 'date_joined', 'last_login',)}),
        ('permission',{'fields':('is_admin', 'is_staff')})
    )

    add_fieldsets = (
        (None, {'classes': ('wide',),
        'fields': ('id','email', 'first_name', 'last_name', 'password1', 'password2')}),
    )

admin.site.register(Account, AccountAdmin)
admin.site.register( Relationship)
admin.site.register( Post )
admin.site.register( Post_Comment )
admin.site.register( Post_like )