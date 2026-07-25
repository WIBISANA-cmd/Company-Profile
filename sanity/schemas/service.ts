import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Layanan Cetak",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nama Layanan",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({
      name: "description",
      title: "Deskripsi Layanan",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon Lucide",
      type: "string",
      description: "Pilihan icon: Printer, Layout, Package, Flag, BookOpen, Tag, Sparkles, Image",
      options: {
        list: [
          { title: "Printer", value: "Printer" },
          { title: "Layout", value: "Layout" },
          { title: "Package", value: "Package" },
          { title: "Flag (Signage)", value: "Flag" },
          { title: "BookOpen (Buku)", value: "BookOpen" },
          { title: "Tag (Promosi)", value: "Tag" },
          { title: "Sparkles", value: "Sparkles" },
          { title: "Image", value: "Image" },
        ],
      },
      initialValue: "Printer",
    }),
    defineField({
      name: "order",
      title: "Urutan Tampil",
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
