class Meditation < ActiveRecord::Base
  belongs_to :user

  def stats_summary
    html = ""
    %w(inhale exhale cycle).each do |phase|
      %w(min max avg).each do |stat|
        html += "#{phase} #{stat}: <span class='time'>#{self.send(phase + "_" + stat).round(1)}</span> s<br>"
      end
    end
    html
  end
end