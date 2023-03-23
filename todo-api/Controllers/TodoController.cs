using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace todo_api.Controllers;

[ApiController]
[Route("[controller]")]
public class TodoController : ControllerBase
{
  public class Todo
  {
    public Guid Id { get; set; }

    public string Content { get; set; }

    public bool? IsCompleted { get; set; }
  }

  public static List<Todo> Todos = new List<Todo>{
    new Todo{ Id=Guid.Parse("fd03ad76-40bb-4923-9596-ba4e3a53c7a1"), Content="Job1" },
    new Todo{ Id=Guid.Parse("93b5a970-a306-44a8-a1a4-92c5c1f16ec3"), Content="Job2" },
    new Todo{ Id=Guid.Parse("814d7745-3ac9-45e3-96c9-972be324f8d2"), Content="Job3" },
    new Todo{ Id=Guid.Parse("00013d36-f4ae-4d71-95d0-3e8dacd1c416"), Content="Job4" },
    new Todo{ Id=Guid.Parse("902b7ad1-55c3-4a9a-9671-b7051a128189"), Content="Job5" }
  };

  [HttpGet]
  public ActionResult<List<Todo>> Get()
  {
    return Ok(Todos);
  }

  [HttpGet("{id}")]
  public ActionResult<Todo> Get(Guid id)
  {
    var todo = Todos.FirstOrDefault(_ => _.Id == id);
    if(todo == null){
      return NotFound("todo not found");
    }

    return Ok(todo);
  }

  [HttpPost]
  public ActionResult<Todo> Post(Todo newTodo)
  {
    newTodo.Id = Guid.NewGuid();
    Todos.Add(newTodo);
    return Ok(newTodo);
  }
}