using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TheatreCMS3.Models;

namespace TheatreCMS3.Controllers
{
    public class RentalClassesController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: RentalClasses
        public ActionResult Index()
        {
            return View(db.RentalClasses.ToList());
        }

        // GET: RentalClasses/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            RentalClass rentalClass = db.RentalClasses.Find(id);
            if (rentalClass == null)
            {
                return HttpNotFound();
            }
            return View(rentalClass);
        }

        // GET: RentalClasses/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: RentalClasses/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "RentalClassID,RentalName,RentalCost,FlawsAndDamages")] RentalClass rentalClass)
        {
            if (ModelState.IsValid)
            {
                db.RentalClasses.Add(rentalClass);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(rentalClass);
        }

        // GET: RentalClasses/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            RentalClass rentalClass = db.RentalClasses.Find(id);
            if (rentalClass == null)
            {
                return HttpNotFound();
            }
            return View(rentalClass);
        }

        // POST: RentalClasses/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "RentalClassID,RentalName,RentalCost,FlawsAndDamages")] RentalClass rentalClass)
        {
            if (ModelState.IsValid)
            {
                db.Entry(rentalClass).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(rentalClass);
        }

        // GET: RentalClasses/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            RentalClass rentalClass = db.RentalClasses.Find(id);
            if (rentalClass == null)
            {
                return HttpNotFound();
            }
            return View(rentalClass);
        }

        // POST: RentalClasses/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            RentalClass rentalClass = db.RentalClasses.Find(id);
            db.RentalClasses.Remove(rentalClass);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
