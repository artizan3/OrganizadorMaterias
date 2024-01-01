package main;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Point;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.SwingConstants;

public class ComponenteGrafico extends JPanel {
	 	private Point initialClick;

	    public ComponenteGrafico() {
	        setPreferredSize(new Dimension(100, 100));
	        setBackground(Color.BLUE);

	        addMouseListener(new MouseAdapter() {
	            public void mousePressed(MouseEvent e) {
	                initialClick = e.getPoint();
	                getComponentAt(initialClick);
	            }
	        });

	        addMouseMotionListener(new MouseAdapter() {
	            public void mouseDragged(MouseEvent e) {
	                int x = getLocation().x + e.getX() - initialClick.x;
	                int y = getLocation().y + e.getY() - initialClick.y;
	                setLocation(x, y);
	            }
	        });
	    }
}
