package com.itilria.altograce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer
{

	/*--------------------------------------------------------------------------------------------*/
	@Override
	public void addViewControllers(ViewControllerRegistry registry)
	{
        registry.addViewController("/login").setViewName("login");
		registry.addViewController("/admin/dashboard").setViewName("dashboard");
		registry.addViewController("/admin/settings").setViewName("settings");
		registry.addViewController("/admin/hr").setViewName("hr");
        registry.addViewController("/reception/dashboard").setViewName("reception-template/dashboard");
	}
	
	/*----------------------------------------------------------------------------------------------*/

	@Override
	public void addInterceptors(InterceptorRegistry registry)
	{
		//Add additional interceptors here
	}

	/*--------------------------------------------------------------------------------------------*/
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry)
	{

	}
	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer)
	{
		//Do nothing
	}

	@Override
	public void addFormatters(FormatterRegistry registry)
	{
		//Add additional formatters here
	}
}

