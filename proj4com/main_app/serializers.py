from rest_framework import serializers
from .models import Account, Relationship, Post, Post_Comment, Post_like

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        # fields = ['id','email','first_name', 'last_name']
        fields = '__all__'
        excludes = 'password'

    def validate_title(self, value):
        if len(value)<5:
            raise serializers.ValidationError('Title has to be at least 5 characters long')

        return value
class AccountGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id','email','first_name', 'last_name','image','is_admin']
        # fields = '__all__'
        # excludes = ['id',]

    def validate_title(self, value):
        if len(value)<5:
            raise serializers.ValidationError('Title has to be at least 5 characters long')

        return value

class RelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relationship
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    # created_by=serializers.SlugRelatedField()
    created_by=AccountGetSerializer() 

    class Meta:
        model = Post
        fields = ('id','created_by','created_at', 'updated_at', 'post_content')

class PostCreateSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = Post
        fields = ('id','created_by','created_at', 'updated_at', 'post_content')


class Post_CommentSerializer(serializers.ModelSerializer):
    created_by=AccountGetSerializer()
    class Meta:
        model = Post_Comment
        fields = '__all__'

class Post_CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post_Comment
        fields = '__all__'

class Post_likeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post_like
        fields = '__all__'