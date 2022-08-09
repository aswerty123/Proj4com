from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import AccountSerializer, PostSerializer
from .models import Account, Post

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['first_name'] = user.first_name
        token['last_name'] = user.last_name

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class AccountList(APIView):
    permission_classes=(IsAuthenticated,)
    def get(self, request):
        accounts = Account.objects.all()
        serializer = AccountSerializer(accounts, many=True)

        return Response(serializer.data)


class AccountCreate(APIView):
    # permission_classes = (IsAuthenticated,)
    def put(self, request):
        serializer = AccountSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        else:
            return Response(serializer.errors)

class AccountDetail(APIView):
    def get(self, request, pk):
        accounts = Account.objects.get(id=pk)
        serializer = AccountSerializer(accounts, many=False)

        return Response(serializer.data)

class AllPostDetails(APIView):
    # permission_classes = (IsAuthenticated,)
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)

        return Response(serializer.data)

class PostCreate(APIView):
    permission_classes = (IsAuthenticated,)
    def put(self, request):
        account, token = JWTAuthentication().authenticate(request)

        # print(account)
        # Post.created_by=token.payload['user_id']
        Post.created_by=account
        # print(token.payload['user_id'])

        serializer = PostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        else:
            return Response(serializer.errors)

class PostUpdate(APIView):
    def patch(self, request, pk):
        posts = Post.objects.get(id=pk)
        serializer = PostSerializer(instance=posts, data= request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)


class PostDelete(APIView):
    def delete(self, request, pk):
        post = Post.objects.get(id=pk)
        post.delete()

        return Response('item deleted')