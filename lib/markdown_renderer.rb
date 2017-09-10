class MarkdownRenderer
  def self.render(text)
    renderer_options = { filter_html: true }
    markdown_extensions = { autolink: true }

    renderer = Redcarpet::Render::HTML.new(renderer_options)
    markdown = Redcarpet::Markdown.new(renderer, markdown_extensions)
    markdown.render(text).html_safe
  end
end