# typed: true
class BaseExporter
  private

  PDF_OPTIONS = {
    margin: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
  }

  def render_view_to_string(view, locals)
    view_renderer.render_to_string view, locals: locals
  end

  def render_view_to_pdf(view, locals)
    html_to_pdf render_view_to_string view, locals
  end

  def view_renderer
    ExportController.new
  end

  def html_to_pdf(html)
    WickedPdf.new.pdf_from_string(html, PDF_OPTIONS)
  end
end
