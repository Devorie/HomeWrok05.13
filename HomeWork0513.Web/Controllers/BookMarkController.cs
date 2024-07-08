using HomeWork0513.Data;
using HomeWork0513.Web.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeWork0513.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookMarkController : ControllerBase
    {
        private readonly string _connectionString;

        public BookMarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet("getmybookmarks")]
        public object GetMyBookMarks()
        {
            var user = GetCurrentUser();
            var bookmarksRepo = new BookmarkRepository(_connectionString);
            return bookmarksRepo.GetUserBookmarks(user.Id);
        }

        [HttpPost]
        [Route("updatetitle")]
        public void UpdateTitle(UpdateTitleViewModel viewModel)
        {
            var manager = new BookmarkRepository(_connectionString);
            manager.UpdateTitle(viewModel.Id, viewModel.Title);
        }

        [AllowAnonymous]
        [HttpGet("gettopfive")]
        public object GetTopFive()
        {
            var bookmarksRepo = new BookmarkRepository(_connectionString);
            return bookmarksRepo.TopFive();
        }

        [HttpPost]
        [Route("addbookmark")]
        public void AddBookMark(Bookmark bookmark)
        {
            var repo = new BookmarkRepository(_connectionString);
            var user = GetCurrentUser();
            bookmark.UserId = user.Id;
            repo.AddBookmark(bookmark);
        }

        [HttpPost]
        [Route("deletebookmark")]
        public void DeleteBookMark(int id)
        {

            Console.WriteLine($"Delete {id}");
            var repo = new BookmarkRepository(_connectionString);
            repo.DeleteBookmark(id);
        }

        private User GetCurrentUser()
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            return user;
        }
    }
}
