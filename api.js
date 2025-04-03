// $.get("https://jsonplaceholder.typicode.com/users", function (data) {
//   data.forEach(function (element, index) {
//     btn = document.createElement("button");
//     $(btn).text(element.name);
//     $(btn).addClass("btn");
//     $(btn).attr("id", element.id);
//     $(".showbtns").append(btn);
//   });

//   $(".btn").click(function () {
//     $.ajax({
//       url:
//         "https://jsonplaceholder.typicode.com/posts?userId=" +
//         $(this).attr("id"),
//       type: "GET",
//       success: function (posts) {
//         $(".showdata").empty();
//         posts.forEach(function (element, index) {
//           newDiv = document.createElement("div");
//           $(newDiv).addClass("newDiv");
//           postdiv = $(newDiv).text(element.title);
//           $(".showdata").append(postdiv);
//         });
//       },
//     });
//   });
// });

// Get users using fetch with .then()
const load = document.getElementsByClassName("loading")[0];
const buttons = document.querySelector(".showbtns");
const postData = document.querySelector(".showdata");

setTimeout(
  () =>
    fetch("https://jsonplaceholder.typicode.com/users") //returns promise
      .then((response) => {
        load.style.display = "none";
        return response.json(); //data
      }) // Parse the response to JSON
      .then((data) => {
        //data is array of users
        // For each user, create a button and append it to the showbtns div
        data.forEach((element) => {
          users(element);
        });

        function users(element) {
          const btn = document.createElement("button");
          btn.textContent = element.name;
          btn.classList.add("btn");
          btn.setAttribute("id", element.id);
          document.querySelector(".showbtns").appendChild(btn);
        }

        // After creating all buttons, simulate a click on the first one
        // setTimeout(() => {
        const buttonsArray = document.querySelectorAll(".btn");
        
        if (buttonsArray.length > 0) {
            console.log(buttonsArray[0]);
            buttonsArray[0].click(); // Click the first button automatically
          }
        // }, 0); // Ensure it happens after the current execution context

        // array of buttons
        
        document.querySelectorAll(".btn").forEach((btn) => {

          btn.addEventListener("click", async () => {
            try {
              load.style.display = "block";
              // const response = await new Promise((resolve) => {
              setTimeout(async () => {
                const res = await fetch(
                  `https://jsonplaceholder.typicode.com/posts?userId=${btn.id}`
                );
                //     resolve(res);
                load.style.display = "none";
                const posts = await res.json();

                // Empty the showdata div and append the posts
                document.querySelector(".showdata").innerHTML = "";
                posts.forEach((post) => {
                  userPost(post);
                });
              }, 1000);

              function userPost(post) {
                const newDiv = document.createElement("div");
                newDiv.classList.add("newDiv");
                newDiv.textContent = post.title;
                document.querySelector(".showdata").appendChild(newDiv);
              }
            } catch (error) {
              console.error("Error fetching posts:", error);
            }
          });

        });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      }),
  2000
);

//functions  👌
//loading 👌
//starts with the 1st button
