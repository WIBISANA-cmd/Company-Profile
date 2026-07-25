import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimoni Pelanggan",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama Pelanggan",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Jabatan / Usaha",
      type: "string",
    }),
    defineField({
      name: "quote",
      title: "Ulasan / Testimoni",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating (1 - 5)",
      type: "number",
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "avatar",
      title: "Foto Profil / Logo Client",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Urutan",
      type: "number",
      initialValue: 0,
    }),
  ],
});
