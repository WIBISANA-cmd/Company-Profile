import { defineField, defineType } from "sanity";

export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio Hasil Cetak",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul Project/Produk",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Digital Printing", value: "Digital Printing" },
          { title: "Offset", value: "Offset" },
          { title: "Packaging", value: "Packaging" },
          { title: "Signage & Banner", value: "Signage & Banner" },
          { title: "Merchandise", value: "Merchandise" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Foto Hasil Cetak",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Keterangan Cetak",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "order",
      title: "Urutan",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Urutan",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
