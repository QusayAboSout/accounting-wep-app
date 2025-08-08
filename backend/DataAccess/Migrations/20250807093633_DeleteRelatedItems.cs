using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class DeleteRelatedItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductCategories_ProductCategoryID",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductColors_ProductColorID",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductSizes_ProductSizeID",
                table: "Products");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductCategories_ProductCategoryID",
                table: "Products",
                column: "ProductCategoryID",
                principalTable: "ProductCategories",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductColors_ProductColorID",
                table: "Products",
                column: "ProductColorID",
                principalTable: "ProductColors",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductSizes_ProductSizeID",
                table: "Products",
                column: "ProductSizeID",
                principalTable: "ProductSizes",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductCategories_ProductCategoryID",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductColors_ProductColorID",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductSizes_ProductSizeID",
                table: "Products");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductCategories_ProductCategoryID",
                table: "Products",
                column: "ProductCategoryID",
                principalTable: "ProductCategories",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductColors_ProductColorID",
                table: "Products",
                column: "ProductColorID",
                principalTable: "ProductColors",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductSizes_ProductSizeID",
                table: "Products",
                column: "ProductSizeID",
                principalTable: "ProductSizes",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
