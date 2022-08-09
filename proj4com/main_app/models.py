import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class AccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError('User must have a valid email.')

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, first_name, last_name, password):
        user = self.create_user(
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password
        )
        user.is_staff = True
        user.is_superuser = True
        user.is_admin = True
        user.save(using=self._db)

        return user


class Account(AbstractBaseUser):
    # uuid = models.UUIDField(default = uuid.uuid4, editable = False)
    # id = models. AutoField(primary_key=True)
    id = models.UUIDField(primary_key=True,default=uuid.uuid4, editable = False)
    email = models.EmailField(verbose_name='email', max_length=60, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_num = models.CharField(max_length=11, null=True)
    gender = models.CharField(max_length=7, null=True)
    image = models.ImageField(null=True, default="avatar.svg")



    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

class Relationship(models.Model):
    sender_id = models.ForeignKey(Account, on_delete=models.DO_NOTHING, null=True, related_name='sender_id')
    receiver_id = models.ForeignKey(Account, on_delete=models.DO_NOTHING, null=True, related_name='receiver_id')
    is_friend = models.BooleanField(default=False)

    def __str__(self):
        return f'sender: {self.sender_id}, receiver: {self.receiver_id}'

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    created_by = models.ForeignKey(Account, on_delete=models.DO_NOTHING)
    created_at =  models.DateTimeField(auto_now_add=True)
    updated_at =  models.DateTimeField(auto_now=True)
    post_content = models.TextField()


    def __str__(self):
        return f'sender: {self.post_content}'
    
class Post_Comment(models.Model):
    id = models.AutoField(primary_key=True)
    created_by = models.ForeignKey(Account, on_delete=models.DO_NOTHING, null=True)
    post_id = models.ForeignKey(Post, on_delete=models.DO_NOTHING, null=True)
    created_at =  models.DateTimeField(auto_now_add=True)
    updated_at =  models.DateTimeField(auto_now=True)
    post_comment_content = models.TextField()

    def __str__(self):
        return f'sender: {self.post_comment_content}'

class Post_like(models.Model):
    id = models.AutoField(primary_key=True)
    post_id = models.ForeignKey(Post, on_delete=models.DO_NOTHING, null=True)
    created_by = models.ForeignKey(Account, on_delete=models.DO_NOTHING, null=True)


