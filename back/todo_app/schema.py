import graphene
from graphene_django import DjangoObjectType

from .models import Project, ProjectUser, ToDo
from users_app.models import MyUserModel


class UserType(DjangoObjectType):
    class Meta:
        model = MyUserModel
        fields = "__all__"


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class ProjectUserType(DjangoObjectType):
    class Meta:
        model = ProjectUser
        fields = "__all__"


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = "__all__"


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    all_projects_user = graphene.List(ProjectUserType)
    all_todo = graphene.List(ToDoType)

    def resolve_all_users(self, info):
        return MyUserModel.objects.all()

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_all_projects_user(self, info):
        return ProjectUser.objects.all()

    def resolve_all_todo(self, info):
        return ToDo.objects.all()

    project_by_id = graphene.Field(ProjectType, pk=graphene.Int(required=True))

    def resolve_project_by_id(self, info, pk):
        return Project.objects.get(pk=pk)


class ProjectCreateMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        is_active = graphene.Boolean(required=True)

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, name, is_active):
        project = Project(name=name, is_active=is_active)
        project.save()
        return cls(project)


class ProjectUpdateMutation(graphene.Mutation):
    class Arguments:
        pk = graphene.Int(required=True)
        name = graphene.String(required=False)
        is_active = graphene.String(required=False)

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, pk, name=None, is_active=False):
        project = Project.objects.get(pk=pk)
        if name:
            project.name = name
        if is_active:
            project.is_active = is_active
        if name or is_active:
            project.save()
        return cls(project)


class Mutation(graphene.ObjectType):
    create_project = ProjectCreateMutation.Field()
    update_project = ProjectUpdateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

# # Получение списка всех пользователей
# curl \
#   -X POST \
#   -H "Content-Type: application/json" \
#   --data '{ "query": "{ allUsers { id, username } }" }' \
#   http://localhost:8000/graphql

# # Получение информации о проекте по ID
# curl \
#   -X POST \
#   -H "Content-Type: application/json" \
#   --data '{ "query": "{ projectById(pk: 1) { name, isActive } }" }' \
#   http://localhost:8000/graphql

# # Создание нового проекта
# curl \
#   -X POST \
#    -H "Content-Type: application/json" \
#    --data '{ "query": "mutation { createProject(name: \"New Project\", isActive: true) { project { id, name } } }" }' \
#    http://localhost:8000/graphql

# # mutation {
# #   createProject(name: "New Project", isActive: true) {
# #     project {
# #       id
# #       name
# #     }
# #   }
# # }

# # Обновление существующего проекта
# curl \
#   -X POST \
#   -H "Content-Type: application/json" \
#   --data '{ "query": "mutation { updateProject(pk: 1, name: \"Updated Project Name\") { project { name, isActive } } }" }' \
#   http://localhost:8000/graphql

# # mutation {
# #   updateProject(pk: 1, name: "Updated Project Name") {
# #     project {
# #       name
# #       isActive
# #     }
# #   }
# # }
