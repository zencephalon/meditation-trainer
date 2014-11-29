class CreateMeditations < ActiveRecord::Migration
  def change
    create_table :meditations do |t|
      %w(inhale exhale cycle).each do |phase|
        %w(min max avg).each do |stat|
          t.float (phase + "_" + stat).to_sym
        end
      end

      t.belongs_to :user
      t.timestamps
    end
  end
end
