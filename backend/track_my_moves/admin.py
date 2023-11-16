from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import UserCreationForm, UserChangeForm
from .models.user import User


class UserAdmin(UserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = User
    list_display = ["email", "is_superuser", "is_staff", "is_active"]
    list_filter = ["email", "is_superuser", "is_staff", "is_active"]
    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Permissions", {"fields": ["is_superuser", "is_staff", "is_active", "groups", "user_permissions"]}),
    ]
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": [
                    "email", "password1", "password2", "is_superuser", "is_staff",
                    "is_active", "groups", "user_permissions"
                ],
            },
        ),
    ]
    search_fields = ["email"]
    ordering = ["email"]


admin.site.register(User, UserAdmin)
