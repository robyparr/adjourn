# typed: true
module ExportHelper
  MARKDOWN_INLINE_LINK_REGEX = /!\[.*\]\((http[s]?:\/\/.+\/uploads\/(\d+)\/download)\)/

  def markdown_text(text, inline_images: {})
    text ||= ""

    renderer_options    = { filter_html: true }
    markdown_extensions = { autolink: true, tables: true, lax_spacing: true }

    renderer = Redcarpet::Render::HTML.new(renderer_options)
    markdown = Redcarpet::Markdown.new(renderer, markdown_extensions)

    replace_inline_upload_links! text, inline_images if inline_images.present?

    markdown.render(text).html_safe
  end

  private

  def replace_inline_upload_links!(text, inline_images)
    inline_image_links_and_upload_ids = text.scan(MARKDOWN_INLINE_LINK_REGEX)

    inline_image_links_and_upload_ids.each do |inline_link, upload_id|
      image_data = inline_images[upload_id.to_i]
      text.gsub! inline_link, image_data[:url]
    end
  end
end
