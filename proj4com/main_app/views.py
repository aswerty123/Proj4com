from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import AccountSerializer, PostSerializer, PostCreateSerializer, Post_CommentSerializer, Post_CommentCreateSerializer
from .models import Account, Post, Post_Comment, Post_like, AccountManager

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from django.contrib.auth.models import  BaseUserManager

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['first_name'] = user.first_name
        token['last_name'] = user.last_name

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


'''
///////////////////////////////////////////////////////         Account
'''



class AccountList(APIView):
    permission_classes=(IsAuthenticated,)
    def get(self, request):
        accounts = Account.objects.all()
        serializer = AccountSerializer(accounts, many=True)

        return Response(serializer.data)


class AccountCreate(APIView):
    
    # permission_classes = (IsAuthenticated,)
    def put(self, request):
        try:
            if(bool(request.data['email'] and request.data['password'] and request.data['first_name'] and request.data['last_name'])):
           
                user = Account(
                    email=BaseUserManager.normalize_email(request.data['email']),
                    first_name=request.data['first_name'],
                    last_name=request.data['last_name'],
                )
                user.set_password(request.data['password'])
                user.save()

                return Response('User created')
            else:
                return Response('empty field')

        except:
            return Response('User Not created')


class AccountDetail(APIView):
    def get(self, request, pk):
        accounts = Account.objects.get(id=pk)
        serializer = AccountSerializer(accounts, many=False)

        return Response(serializer.data)


'''
///////////////////////////////////////////////////////         Post
'''

class AllPostDetails(APIView):
    # permission_classes = (IsAuthenticated,)
    def get(self, request):
        
        posts = Post.objects.all().order_by('-created_at')
        serializer = PostSerializer(posts, many=True)

        for item in serializer.data:
            item['comment_count'] = Post_Comment.objects.filter(post_id=item['id']).count()
            # print(item)

        return Response(serializer.data)

class PostCreate(APIView):
    permission_classes = (IsAuthenticated,)
    def put(self, request):
        account, token = JWTAuthentication().authenticate(request)

        # Post.created_by=token.payload['user_id']
        request.data['created_by'] = token.payload['user_id']
        print(request.data)
        # print(token.payload['user_id'])

        serializer = PostCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        else:
            return Response(serializer.errors)

class PostUpdate(APIView):
    permission_classes = (IsAuthenticated,)
    def patch(self, request, pk):
        posts = Post.objects.get(id=pk)
        serializer = PostSerializer(instance=posts, data= request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)


class PostDelete(APIView):
    permission_classes = (IsAuthenticated,)
    def delete(self, request, pk):
        post = Post.objects.filter(id=pk)
        print(post)
        post.delete()

        return Response('item deleted')


'''
///////////////////////////////////////////////////////         Comment
'''

class AllCommentDetails(APIView):
    # permission_classes = (IsAuthenticated,)
    def get(self, request, pk):
        
        comments = Post_Comment.objects.filter(post_id=pk).order_by('created_at')
        serializer = Post_CommentSerializer(comments, many=True)

        return Response(serializer.data)

class CommentCreate(APIView):
    permission_classes = (IsAuthenticated,)
    def put(self, request, pk):
        account, token = JWTAuthentication().authenticate(request)

        # Post.created_by=token.payload['user_id']
        request.data['created_by'] = token.payload['user_id']
        request.data['post_id'] = pk
        print(request.data)
        # print(token.payload['user_id'])

        serializer = Post_CommentCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        else:
            return Response(serializer.errors)