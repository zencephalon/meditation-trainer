class User < ActiveRecord::Base
  has_secure_password
  has_many :meditations
  # Remember to create a migration!

  def stats_summary
    html = ""
    %w(inhale exhale cycle).each do |phase|
      %w(min max avg).each do |stat|
        time = format_time(self.meditations.map {|med| med.send(phase + "_" + stat)}.max)
        html += "record #{phase} #{stat}: #{time}<br>"
      end
    end
    html
  end

  def format_time(time)
    "<span class='time'>#{time.round(1)}</span> s"
  end
end
