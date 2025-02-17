namespace TheatreCMS3.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AdjustingBlogPostModel : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.BlogPosts", "Content", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.BlogPosts", "Content", c => c.Int(nullable: false));
        }
    }
}
