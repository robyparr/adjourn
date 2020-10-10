# typed: true
module ContentTypes
  extend ActiveSupport::Concern

  CONTENT_TYPES = %w[
    text/plain
    image/bmp
    image/gif
    image/x-icon
    image/jpeg
    image/png
    image/svg+xml
    image/tiff
    image/webp
    audio/wave
    audio/wav
    audio/webm
    video/webm
    audio/ogg
    video/ogg
    application/pdf
    application/zip
    application/msword
    application/vnd.openxmlformats-officedocument.wordprocessingml.document
    application/vnd.openxmlformats-officedocument.wordprocessingml.template
    application/vnd.ms-excel
    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    application/vnd.openxmlformats-officedocument.spreadsheetml.template
    application/vnd.ms-powerpoint
    application/vnd.openxmlformats-officedocument.presentationml.presentation
    application/vnd.openxmlformats-officedocument.presentationml.slideshow
    application/vnd.ms-access
  ]
end
