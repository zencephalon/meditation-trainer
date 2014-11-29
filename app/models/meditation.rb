class Meditation < ActiveRecord::Base
  belongs_to :user

  def stats_summary
    html = ""
    %w(inhale exhale cycle).each do |phase|
      %w(min max avg).each do |stat|
        html += "#{phase} #{stat}: #{format_time(self.send(phase + "_" + stat))} s<br>"
      end
    end
    html
  end

  def format_time(time)
    "<span class='time'>#{time.round(1)}</span>"
  end

  def table_row
    html = "<tr><td><a href='/meditation/#{self.id}'>#{self.id}</a></td>"
    %w(inhale exhale cycle).each do |phase|
      %w(min max avg).each do |stat|
        html += "<td>#{format_time(self.send(phase + "_" + stat))}</td>"
      end
    end
    html + "</tr>"
  end
end