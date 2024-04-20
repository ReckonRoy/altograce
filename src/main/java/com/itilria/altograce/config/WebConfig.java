package com.itilria.altograce.config;

import org.springframework.context.support.ResourceBundleMessageSource;
import java.util.Locale;
import java.util.Properties;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.Validator;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.MessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;
import lombok.RequiredArgsConstructor;

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

