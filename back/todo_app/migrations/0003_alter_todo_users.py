# Generated by Django 4.2.5 on 2023-09-08 09:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('todo_app', '0002_alter_todo_options_remove_todo_users_todo_users'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='users',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='creator', to='todo_app.projectuser', verbose_name='Пользователи'),
        ),
    ]