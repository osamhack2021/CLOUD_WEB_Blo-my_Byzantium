#backend/post/models.py
from django.db import models

class Post(models.Model):
    objects = models.Manager()              #에러해결용
    title = models.CharField(max_length=200)
    content = models.TextField()
    

    def __str__(self):
        """A string representation of the model."""
        return self.title