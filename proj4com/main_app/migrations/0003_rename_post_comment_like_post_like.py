# Generated by Django 4.1 on 2022-08-08 04:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0002_post_comment_like'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Post_Comment_like',
            new_name='Post_like',
        ),
    ]