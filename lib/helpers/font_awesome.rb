module FontAwesomeHelper
  def fas(icon, opts = {})
    classes = ['fas', "fa-#{icon}"]

    classes << "fa-#{opts[:size]}" if opts[:size]
    classes << 'fa-li' if opts[:li]
    classes << "fa-stack-#{opts[:stack]}" if opts[:stack]
    classes << 'fa-inverse' if opts[:inverse]
    classes << 'fa-fw' if opts[:fw]
    classes << opts[:class]

    "<i class='#{classes.reject(&:nil?).join(' ')}'></i>"
  end
  def fab(icon, opts = {})
    classes = ['fab', "fa-#{icon}"]

    classes << "fa-#{opts[:size]}" if opts[:size]
    classes << 'fa-li' if opts[:li]
    classes << "fa-stack-#{opts[:stack]}" if opts[:stack]
    classes << 'fa-inverse' if opts[:inverse]
    classes << 'fa-fw' if opts[:fw]
    classes << opts[:class]

    "<i class='#{classes.reject(&:nil?).join(' ')}'></i>"
  end
end
