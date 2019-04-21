module ExportHelper
  def markdown_text(text)
    text ||= ""

    renderer_options    = { filter_html: true }
    markdown_extensions = { autolink: true, tables: true, lax_spacing: true }

    renderer = Redcarpet::Render::HTML.new(renderer_options)
    markdown = Redcarpet::Markdown.new(renderer, markdown_extensions)

    markdown.render(text).html_safe
  end
end
