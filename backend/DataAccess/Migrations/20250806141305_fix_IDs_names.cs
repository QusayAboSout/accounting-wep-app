using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class fix_IDs_names : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Categories_CategoryID",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "CategoryID",
                table: "Products",
                newName: "ProductCategoryID");

            migrationBuilder.RenameIndex(
                name: "IX_Products_CategoryID",
                table: "Products",
                newName: "IX_Products_ProductCategoryID");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "ID",
                keyValue: 1L,
                column: "Name",
                value: "إلكترونيات");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "ID",
                keyValue: 2L,
                column: "Name",
                value: "ملابس");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "ID",
                keyValue: 3L,
                column: "Name",
                value: "طعام");

            migrationBuilder.UpdateData(
                table: "ProductColors",
                keyColumn: "ID",
                keyValue: 1L,
                column: "Name",
                value: "أحمر");

            migrationBuilder.UpdateData(
                table: "ProductColors",
                keyColumn: "ID",
                keyValue: 2L,
                column: "Name",
                value: "أزرق");

            migrationBuilder.UpdateData(
                table: "ProductColors",
                keyColumn: "ID",
                keyValue: 3L,
                column: "Name",
                value: "أخضر");

            migrationBuilder.UpdateData(
                table: "ProductSizes",
                keyColumn: "ID",
                keyValue: 1L,
                column: "Name",
                value: "صغير");

            migrationBuilder.UpdateData(
                table: "ProductSizes",
                keyColumn: "ID",
                keyValue: 2L,
                column: "Name",
                value: "متوسط");

            migrationBuilder.UpdateData(
                table: "ProductSizes",
                keyColumn: "ID",
                keyValue: 3L,
                column: "Name",
                value: "كبير");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Categories_ProductCategoryID",
                table: "Products",
                column: "ProductCategoryID",
                principalTable: "Categories",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Categories_ProductCategoryID",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "ProductCategoryID",
                table: "Products",
                newName: "CategoryID");

            migrationBuilder.RenameIndex(
                name: "IX_Products_ProductCategoryID",
                table: "Products",
                newName: "IX_Products_CategoryID");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "ID",
                keyValue: 1L,
                column: "Name",
                value: "Electronics");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "ID",
                keyValue: 2L,
                column: "Name",
                value: "Clothing");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "ID",
                keyValue: 3L,
                column: "Name",
                value: "Food");

            migrationBuilder.UpdateData(
                table: "ProductColors",
                keyColumn: "ID",
                keyValue: 1L,
                column: "Name",
                value: "Red");

            migrationBuilder.UpdateData(
                table: "ProductColors",
                keyColumn: "ID",
                keyValue: 2L,
                column: "Name",
                value: "Blue");

            migrationBuilder.UpdateData(
                table: "ProductColors",
                keyColumn: "ID",
                keyValue: 3L,
                column: "Name",
                value: "Green");

            migrationBuilder.UpdateData(
                table: "ProductSizes",
                keyColumn: "ID",
                keyValue: 1L,
                column: "Name",
                value: "Small");

            migrationBuilder.UpdateData(
                table: "ProductSizes",
                keyColumn: "ID",
                keyValue: 2L,
                column: "Name",
                value: "Medium");

            migrationBuilder.UpdateData(
                table: "ProductSizes",
                keyColumn: "ID",
                keyValue: 3L,
                column: "Name",
                value: "Large");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Categories_CategoryID",
                table: "Products",
                column: "CategoryID",
                principalTable: "Categories",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
