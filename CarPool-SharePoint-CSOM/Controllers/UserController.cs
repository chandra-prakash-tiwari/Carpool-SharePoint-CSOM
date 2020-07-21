using Antlr.Runtime.Misc;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CarPool_SharePoint_CSOM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        private readonly Services.ClientInterfaces.IUserService Service;

        public UserController()
        {
            this.Service = new Services.ClientServices.UserService();
        }

        [HttpPost]
        [ActionName("authenticate")]
        public Models.User Authentication([FromBody] Models.LoginRequest login)
        {
            if (login == null)
                return null;

            var user = this.Service.Authenticate(login);
            if (user == null)
                return null;

            return user;
        }

        [HttpGet]
        [ActionName("getbyid")]
        public Models.User GetUser(string id)
        {
            if (string.IsNullOrEmpty(id))
                return null;

            Models.User user = this.Service.GetById(id);
            if (user == null)
                return null;

            return user;
        }

        [HttpPost]
        [ActionName("create")]
        public Models.User Create([FromBody] Models.User user)
        {
            if (user == null)
            {
                return null;
            }
            else if (this.Service.Create(user))
            {
                return user;
            }

            return null;
        }

        [HttpDelete]
        [ActionName("delete")]
        public bool Delete(string id)
        {
            if (!this.Service.Delete(id))
            {
                return false;
            }

            return true;
        }

        [HttpPut]
        [ActionName("update")]
        public bool Update([FromBody] Models.User user)
        {
            if (user == null)
                return false;

            Models.User old = this.Service.GetById(user.Id);
            if (old == null)
                return false;

            else if (!this.Service.Update(user))
            {
                return false;
            }
            return true;
        }

        [HttpGet]
        [ActionName("hasusername")]
        public bool HasUserName(string userName)
        {
            if (string.IsNullOrEmpty(userName))
                return true;

            return (this.Service.HasUserName(userName));
        }

        [HttpGet]
        [ActionName("hasemail")]
        public bool HasEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
                return true;

            return (this.Service.HasEmail(email));
        }
    }
}
