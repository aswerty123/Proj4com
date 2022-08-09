from rest_framework import serializers
from .models import Account, Relationship, Post, Post_Comment, Post_like

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
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
    created_by = serializers.SlugRelatedField(
        # many=True,
        read_only=True,
        slug_field= ('first_name')
        # slug_field= 'last_name'
     )
    class Meta:
        model = Post
        fields = '__all__'

class Post_CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post_Comment
        fields = '__all__'

class Post_likeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post_like
        fields = '__all__'