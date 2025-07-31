using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class v1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ProductColors",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductColors", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ProductSizes",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductSizes", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cost = table.Column<long>(type: "bigint", nullable: false),
                    CostPrice = table.Column<long>(type: "bigint", nullable: false),
                    Barcode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryID = table.Column<long>(type: "bigint", nullable: false),
                    ProductColorID = table.Column<long>(type: "bigint", nullable: false),
                    ProductSizeID = table.Column<long>(type: "bigint", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Products_Categories_CategoryID",
                        column: x => x.CategoryID,
                        principalTable: "Categories",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_ProductColors_ProductColorID",
                        column: x => x.ProductColorID,
                        principalTable: "ProductColors",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_ProductSizes_ProductSizeID",
                        column: x => x.ProductSizeID,
                        principalTable: "ProductSizes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "ID", "CreateDate", "Name" },
                values: new object[,]
                {
                    { 1L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Electronics" },
                    { 2L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Clothing" },
                    { 3L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Food" }
                });

            migrationBuilder.InsertData(
                table: "ProductColors",
                columns: new[] { "ID", "CreateDate", "Name" },
                values: new object[,]
                {
                    { 1L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Red" },
                    { 2L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Blue" },
                    { 3L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Green" }
                });

            migrationBuilder.InsertData(
                table: "ProductSizes",
                columns: new[] { "ID", "CreateDate", "Name" },
                values: new object[,]
                {
                    { 1L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Small" },
                    { 2L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Medium" },
                    { 3L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Large" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ID", "Barcode", "CategoryID", "Cost", "CostPrice", "CreateDate", "Name", "ProductColorID", "ProductSizeID" },
                values: new object[,]
                {
                    { 1L, "1234567890123", 1L, 500L, 450L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Smartphone", 1L, 2L },
                    { 2L, "8881112333888", 2L, 30L, 20L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "T-Shirt", 2L, 1L },
                    { 3L, "3333333334443", 3L, 15L, 10L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Chocolate Box", 3L, 3L }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryID",
                table: "Products",
                column: "CategoryID");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductColorID",
                table: "Products",
                column: "ProductColorID");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductSizeID",
                table: "Products",
                column: "ProductSizeID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "ProductColors");

            migrationBuilder.DropTable(
                name: "ProductSizes");
        }
    }
}
