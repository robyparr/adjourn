ActionView::Base.field_error_proc = Proc.new do |html_tag, instance|
  tag_fragment = Nokogiri::HTML::DocumentFragment.parse(html_tag).css('*')[0]
  tag_id = tag_fragment[:id]
  tag_errors = tag_fragment['data-errors']
  %Q{
    #{html_tag}
    <div class='errors' data-errors-for='##{tag_id}'>
      #{tag_errors}
    </div>
  }.html_safe
end