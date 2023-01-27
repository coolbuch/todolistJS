"use strict"
window.onload = function()
{
  update();
  var nodeCount = 0;
  var currentNode = null;





  function checkboxHandler()
  {
    if (this.className == "list-content-cell-checkbox")
      this.className = "list-content-cell-checkbox-checked";
    else
      if (this.className == "list-content-cell-checkbox-checked")
        this.className = "list-content-cell-checkbox";
    if (this.className == "card-highpriority-checkbox")
    {
      this.className = "card-highpriority-checkbox-checked";
    }
    else
      if(this.className == "card-highpriority-checkbox-checked")
        this.className = "card-highpriority-checkbox";
    if (this.className == "list-content-cell-checkbox-checked")
    {
      this.parentNode.parentNode.style.opacity = "0.5";
      this.parentNode.parentNode.querySelector(".list-content-cell-text").className = "list-content-cell-text-hidden"
    }
    else if (this.className == "list-content-cell-checkbox")
    {
      this.parentNode.parentNode.style.opacity = "1";
      this.parentNode.parentNode.querySelector(".list-content-cell-text-hidden").className = "list-content-cell-text"
    }
  }

  function editNote()
  {
    currentNode = this.parentNode.parentNode;
    document.querySelector(".card-task-input input").value = this.parentNode.parentNode.querySelector(".list-content-cell-text").textContent.trim();
    if (currentNode.querySelector(".list-content-cell-highpriority-hidden") != null)
    {
      if (document.querySelector(".card-highpriority-checkbox-checked") != null)
        document.querySelector(".card-highpriority-checkbox-checked").className = "card-highpriority-checkbox";
    }
    else
      if (currentNode.querySelector(".list-content-cell-highpriority") != null)
      {
        if (document.querySelector(".card-highpriority-checkbox") != null)
          document.querySelector(".card-highpriority-checkbox").className = "card-highpriority-checkbox-checked";
      }
    update();
  }

  function removeNote()
  {
    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
  }

  function update()
  {
    for (let i = 0; i < document.querySelectorAll(".list-content-cell-checkbox").length; i++)
    {
      var elem = document.querySelectorAll(".list-content-cell-checkbox")[i];
      elem.addEventListener("click", checkboxHandler);
    }
    if (document.querySelector(".card-highpriority-checkbox") != null)
      document.querySelector(".card-highpriority-checkbox").addEventListener("click",checkboxHandler);
    else
    {
        document.querySelector(".card-highpriority-checkbox-checked").addEventListener("click",checkboxHandler);
    }
    document.querySelector(".list-header-button").addEventListener("click", addNote);
    document.querySelector(".card-buttons button[name=\"save-button\"]").addEventListener("click", saveNode);
    document.querySelector(".card-buttons button[name=\"cancel-button\"]").addEventListener("click", cancel);
    for (let i = 0 ; i < document.querySelectorAll(".list-content-cell-edit").length; i++)
    {
      var elem = document.querySelectorAll(".list-content-cell-edit")[i];
      elem.addEventListener("click", editNote);
    }
    for (let i = 0 ; i < document.querySelectorAll(".list-content-cell-remove").length; i++)
    {
      var elem = document.querySelectorAll(".list-content-cell-remove")[i];
      elem.addEventListener("click", removeNote);
    }
  }

  function addNote()
  {
    nodeCount++;
    var note = "<div class=\"list-content-cell\"><div class=\"list-content-cell-checkbox-wrapper\"><div class=\"list-content-cell-checkbox\"></div></div><div class=\"list-content-cell-highpriority-hidden\">🗲</div><div class=\"list-content-cell-text\"> Задача " + nodeCount + "</div><div class=\"list-content-cell-remove-wrapper\"><div class=\"list-content-cell-remove\"></div></div><div class=\"list-content-cell-edit-wrapper\"><div class=\"list-content-cell-edit\"></div></div></div></div>";
    document.querySelector(".list-content-notes").insertAdjacentHTML("beforeEnd",note);
    update();
  }

  function saveNode()
  {
      if (currentNode != null)
      {
        currentNode.querySelector(".list-content-cell-text").textContent = document.querySelector(".card-task-input input").value;
        if (document.querySelector(".card-highpriority-checkbox") == null)
        {
          if (currentNode.querySelector(".list-content-cell-highpriority-hidden") != null)
            currentNode.querySelector(".list-content-cell-highpriority-hidden").className = "list-content-cell-highpriority";
        }
        else
        {
          if (currentNode.querySelector(".list-content-cell-highpriority") != null)
            currentNode.querySelector(".list-content-cell-highpriority").className = "list-content-cell-highpriority-hidden";
        }
      }

  }


  function cancel()
  {
    if (currentNode != null)
    {
      document.querySelector(".card-task-input input").value = currentNode.querySelector(".list-content-cell-text").textContent.trim();
      if (currentNode.querySelector(".list-content-cell-highpriority-hidden") != null)
      {
        if (document.querySelector(".card-highpriority-checkbox-checked") != null)
          document.querySelector(".card-highpriority-checkbox-checked").className = "card-highpriority-checkbox";
      }
      else
        if (currentNode.querySelector(".list-content-cell-highpriority") != null)
        {
          if (document.querySelector(".card-highpriority-checkbox") != null)
            document.querySelector(".card-highpriority-checkbox").className = "card-highpriority-checkbox-checked";
        }

    }
  }
}
