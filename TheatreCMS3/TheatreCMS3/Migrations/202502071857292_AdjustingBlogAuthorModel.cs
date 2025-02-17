namespace TheatreCMS3.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AdjustingBlogAuthorModel : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.BlogAuthors", "Left", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.BlogAuthors", "Left", c => c.DateTime(nullable: false));
        }
    }
}
