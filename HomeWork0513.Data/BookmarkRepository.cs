using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace HomeWork0513.Data
{
    public class BookmarkRepository
    {
        private readonly string _connectionString;

        public BookmarkRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Bookmark> GetUserBookmarks(int userId)
        {
            using var context = new BookMarksDataContext(_connectionString);
            return context.Bookmarks.Where(b => b.UserId == userId).ToList();
        }

        public void DeleteBookmark(int id)
        {
            using var context = new BookMarksDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Bookmarks WHERE Id = {id}");
        }

        public void AddBookmark(Bookmark bookmark)
        {
            using var context = new BookMarksDataContext(_connectionString);
            context.Bookmarks.Add(bookmark);
            context.SaveChanges();
        }

        public void UpdateTitle(int id, string title)
        {
            using var context = new BookMarksDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated(
                $"UPDATE Bookmarks SET Title = {title} WHERE Id = {id}");
        }

        //public List<TopBookmark> TopFive()
        //{
        //    using var context = new BookMarksDataContext(_connectionString);
        //    var query = "SELECT TOP 5 Url, COUNT(Url) AS 'Count' FROM Bookmarks GROUP BY Url ORDER BY Count DESC";
        //    return context.Database.FromSqlRaw(query).ToList();
        //}

        //public List<TopBookmark> TopFive()
        //{
        //    var query = @"SELECT TOP 5 Url, Count(*) AS 'Count' from Bookmarks
        //                GROUP BY Url
        //                ORDER BY Count DESC";

        //    using var context = new BookMarksDataContext(_connectionString);
        //    return context.TopBookmarks.FromSqlRaw(query).ToList();
        //}

        public List<TopBookmark> TopFive()
        {
            using var context = new BookMarksDataContext(_connectionString);
            return context.Bookmarks.GroupBy(b => b.Url)
                .OrderByDescending(b => b.Count()).Take(5)
                .Select(i => new TopBookmark
                {
                    Url = i.Key,
                    Count = i.Count()
                })
                .ToList();
        }
    }
}
